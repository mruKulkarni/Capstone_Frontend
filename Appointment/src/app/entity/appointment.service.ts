export class AppointmentManageDTO {
  appointmentId: number;  // Use 'appointmentId' here
  doctorId: number;
  userName: string;
  doctorName: string;
  department: string;
  date: string;
  slot: string;
  status: string;

  constructor(
    appointmentId: number,  // Use 'appointmentId' here
    doctorId: number,
    userName: string,
    doctorName: string,
    department: string,
    date: string,
    slot: string,
    status: string
  ) {
    this.appointmentId = appointmentId;  // Use 'appointmentId' here
    this.doctorId = doctorId;
    this.userName = userName;
    this.doctorName = doctorName;
    this.department = department;
    this.date = date;
    this.slot = slot;
    this.status = status;
  }
}
