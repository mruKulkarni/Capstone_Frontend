export class AppointmentManageDTO {
  doctorId: number;
  userName: string;
  doctorName: string;
  department: string;
  date: string;  // Depending on how you handle the date format, you may need a Date type or string
  slot: string;
  status: string;

  constructor(
    doctorId: number,
    userName: string,
    doctorName: string,
    department: string,
    date: string,
    slot: string,
    status: string
  ) {
    this.doctorId = doctorId;
    this.userName = userName;
    this.doctorName = doctorName;
    this.department = department;
    this.date = date;
    this.slot = slot;
    this.status = status;
  }
}
