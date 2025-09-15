import { useState } from "react";
import Navigation from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Bell, 
  Plus,
  ChevronLeft,
  ChevronRight,
  AlarmClock,
  BookOpen,
  Users,
  MapPin
} from "lucide-react";

const mockSchedule = {
  "2025-01-15": [
    {
      id: 1,
      title: "Advanced Mathematics",
      teacher: "Dr. Sarah Smith",
      time: "09:00 - 10:30",
      duration: "90 min",
      location: "Room 201",
      type: "lecture",
      color: "bg-primary"
    },
    {
      id: 2,
      title: "Physics Lab",
      teacher: "Prof. Michael Johnson", 
      time: "14:00 - 16:00",
      duration: "120 min",
      location: "Lab 3",
      type: "lab",
      color: "bg-accent"
    }
  ],
  "2025-01-16": [
    {
      id: 3,
      title: "Literature Discussion",
      teacher: "Dr. Emily Chen",
      time: "10:00 - 11:30",
      duration: "90 min",
      location: "Room 105",
      type: "seminar",
      color: "bg-secondary"
    },
    {
      id: 4,
      title: "Computer Science Project",
      teacher: "Dr. David Lee",
      time: "15:00 - 17:00", 
      duration: "120 min",
      location: "Computer Lab",
      type: "workshop",
      color: "bg-success"
    }
  ],
  "2025-01-17": [
    {
      id: 5,
      title: "Chemistry Practical",
      teacher: "Dr. Lisa Wang",
      time: "11:00 - 13:00",
      duration: "120 min",
      location: "Chemistry Lab",
      type: "lab",
      color: "bg-accent"
    }
  ]
};

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];

export default function Curriculum() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [calendarPermission, setCalendarPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  const requestCalendarPermission = async () => {
    try {
      // Check if the browser supports calendar access (experimental feature)
      if ('calendar' in navigator) {
        // This is a hypothetical API - actual implementation would depend on browser support
        const permission = await (navigator as any).permissions.query({name: 'calendar'});
        setCalendarPermission(permission.state);
      } else {
        // Fallback: use generic notification permission for demonstration
        const permission = await Notification.requestPermission();
        setCalendarPermission(permission === 'granted' ? 'granted' : 'denied');
      }
    } catch (error) {
      console.log('Calendar permission request failed:', error);
      setCalendarPermission('denied');
    }
  };

  const addToCalendar = async (event: any) => {
    if (calendarPermission !== 'granted') {
      await requestCalendarPermission();
      return;
    }

    // Create calendar event (this would integrate with actual calendar APIs)
    const eventDetails = {
      title: event.title,
      start: new Date(`${selectedDate}T${event.time.split(' - ')[0]}`),
      end: new Date(`${selectedDate}T${event.time.split(' - ')[1]}`),
      description: `Teacher: ${event.teacher}\nLocation: ${event.location}`,
      location: event.location
    };

    // In a real app, this would use calendar APIs like Google Calendar API
    console.log('Adding to calendar:', eventDetails);
    
    // Create a simple reminder using the Notification API
    if (Notification.permission === 'granted') {
      // Set a notification 15 minutes before
      const notificationTime = eventDetails.start.getTime() - Date.now() - (15 * 60 * 1000);
      if (notificationTime > 0) {
        setTimeout(() => {
          new Notification(`Upcoming Class: ${event.title}`, {
            body: `Starting in 15 minutes at ${event.location}`,
          });
        }, notificationTime);
      }
    }
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvents = mockSchedule[dateStr] && mockSchedule[dateStr].length > 0;
      days.push({
        day,
        dateStr,
        hasEvents,
        isToday: dateStr === new Date().toISOString().split('T')[0],
        isSelected: dateStr === selectedDate
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const selectedEvents = mockSchedule[selectedDate] || [];
  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Curriculum Calendar</h1>
            <p className="text-muted-foreground">
              View your class schedule and set reminders for important sessions
            </p>
          </div>
          <div className="flex gap-2 mt-4 lg:mt-0">
            <Button 
              onClick={requestCalendarPermission}
              variant="outline"
              className="hover:bg-accent/10 hover:text-accent hover:border-accent/30"
            >
              <AlarmClock className="h-4 w-4 mr-2" />
              Enable Reminders
            </Button>
            <Button className="gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {daysOfWeek.map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day.slice(0, 3)}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <div key={index} className="aspect-square">
                      {day && (
                        <button
                          onClick={() => setSelectedDate(day.dateStr)}
                          className={`w-full h-full p-1 rounded-lg text-sm transition-smooth hover:bg-primary/10 ${
                            day.isSelected 
                              ? 'bg-primary text-primary-foreground' 
                              : day.isToday 
                              ? 'bg-accent/20 text-accent font-semibold' 
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span>{day.day}</span>
                            {day.hasEvents && (
                              <div className="w-1 h-1 bg-current rounded-full mt-1"></div>
                            )}
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Schedule */}
          <div>
            <Card className="gradient-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <span>Schedule for</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {selectedEvents.length > 0 ? (
                  selectedEvents.map((event) => (
                    <div key={event.id} className="group">
                      <Card className="border hover:shadow-primary transition-smooth">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className={`w-3 h-3 rounded-full ${event.color} flex-shrink-0 mt-1`}></div>
                            <Badge variant="outline" className="text-xs ml-2">
                              {event.type}
                            </Badge>
                          </div>
                          
                          <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{event.teacher}</p>
                          
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3" />
                              <span>{event.time} ({event.duration})</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={() => addToCalendar(event)}
                            size="sm" 
                            variant="outline"
                            className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-all hover:bg-accent/10 hover:text-accent hover:border-accent/30"
                          >
                            <Bell className="h-3 w-3 mr-2" />
                            Set Reminder
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No classes scheduled for this day</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="gradient-card border-0 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm">Total Classes</span>
                  </div>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-accent" />
                    <span className="text-sm">Subjects</span>
                  </div>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Study Hours</span>
                  </div>
                  <span className="font-semibold">18h</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {calendarPermission === 'prompt' && (
          <Card className="mt-8 border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlarmClock className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Enable Calendar Reminders</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow Gamai to access your calendar to set automatic reminders for classes and important events.
                  </p>
                </div>
                <Button 
                  onClick={requestCalendarPermission}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Enable Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}