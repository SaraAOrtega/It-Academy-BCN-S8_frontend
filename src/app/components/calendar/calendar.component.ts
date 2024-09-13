import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../services/calendar.service';
import { Event } from '../../intefaces/event';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @ViewChild('createEventModal') createEventModal!: TemplateRef<any>;
  @ViewChild('deleteEventModal') deleteEventModal!: TemplateRef<any>;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: '',
      center: 'title',
      right: 'prev,next'
    },
    events: this.fetchEvents.bind(this),
    eventContent: this.customEventContent.bind(this), 
    showNonCurrentDates: true,
    fixedWeekCount: false
  };

  newEvent: Event = { name_event: '', date_event: '' };
  private modalRef: NgbModalRef | null = null;
  private eventToDeleteId: number | null = null;

  constructor(
    private eventService: EventService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('delete-event')) {
        const eventId = target.getAttribute('data-event-id');
        if (eventId) {
          this.openDeleteEventModal(parseInt(eventId, 10));
        }
      }
    });
  }

 
  customEventContent(eventInfo: any) {
    const eventTitle = eventInfo.event.title;
    const eventId = eventInfo.event.id;

    const eventContent = document.createElement('div');
    eventContent.classList.add('event-content');

    const titleElement = document.createElement('span');
    titleElement.classList.add('event-title');
    titleElement.textContent = eventTitle;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-sm', 'delete-event');
    deleteButton.setAttribute('data-event-id', eventId);
    deleteButton.innerHTML = '&times;';

    eventContent.appendChild(titleElement);
    eventContent.appendChild(deleteButton);

    return { domNodes: [eventContent] };
  }

  openDeleteEventModal(eventId: number) {
    this.eventToDeleteId = eventId;
    this.modalRef = this.modalService.open(this.deleteEventModal);
  }

  confirmDeleteEvent() {
    if (this.eventToDeleteId !== null) {
      this.deleteEvent(this.eventToDeleteId);
      this.modalRef?.close();
      this.eventToDeleteId = null;
    }
  }

  fetchEvents(fetchInfo: any, successCallback: Function, failureCallback: Function) {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        const formattedEvents: EventInput[] = events.map(event => ({
          id: event.id_event?.toString(),
          title: event.name_event || 'Unnamed Event',
          date: event.date_event || new Date().toISOString().split('T')[0]
        }));
        successCallback(formattedEvents);
      },
      error: (error) => {
        failureCallback(error);
        console.error('Error fetching events', error);
      }
    });
  }

  private deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe({
      next: () => {
        this.removeEventFromCalendar(eventId.toString());
      },
      error: (error) => console.error('Error deleting event', error)
    });
  }

  private removeEventFromCalendar(eventId: string) {
    const calendarApi = this.calendarComponent.getApi();
    const event = calendarApi.getEventById(eventId);
    if (event) {
      event.remove();
    }
  }

  openCreateEventModal() {
    this.newEvent = { name_event: '', date_event: '' };
    this.modalRef = this.modalService.open(this.createEventModal);
  }

  createEvent() {
    if (this.newEvent.name_event && this.newEvent.date_event) {
      this.eventService.createEvent(this.newEvent).subscribe({
        next: (createdEvent) => {
          this.addEventToCalendar(createdEvent);
          if (this.modalRef) {
            this.modalRef.close();
          }
        },
        error: (error) => console.error('Error creating event', error)
      });
    }
  }

  private addEventToCalendar(event: Event) {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.addEvent({
      id: event.id_event?.toString(),
      title: event.name_event || 'Unnamed Event',
      date: event.date_event || new Date().toISOString().split('T')[0]
    });
  }
}
