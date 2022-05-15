export interface User {
  email: string;
  password: string;
  mobile: string;
  dob: string;
  name: string;
}
export interface Doctor {
  email: string;
  password: string;
  hospital: string;
  name: string;
  mobileNo: number;
  approved: boolean;
}
export interface HospitalAdmin {
  email: string;
  password: string;
  hospital: string;
  name: string;
  approved: boolean;
}

export interface SuperAdmin {
  email: string;
  password: string;
}

export interface HospitalData {
  name: string;
  address: string;
  location: string;
  pincode: number;
  landline: number;
  state: string;
  district: string;
  mobile: number;
  emergency: string;
}
export interface AppointmentVisitData {
  date: string;
  doctor: string;
  fees: number;
  unpaid: number;
  remarks: string;
  monitoring: any;
}

export interface Appointment {
  id: string;
  creationDate: string;
  nextAppointment: string;
  hospital: HospitalData;
  patient: User;
  closed: boolean;
  visits: AppointmentVisitData[];
  cancellable: boolean;
}
export interface BookAppointment {
  success: boolean;
  message: string;
  appointment: Appointment;
}
export interface AppointmentResponse {
  success: boolean;
  message: string;
  totalAppointments: number;
  page: number;
  totalPages: number;
  appointments: Appointment[];
}

export interface DoctorAuthResponse {
  success: boolean;
  message: string;
  token: string;
  doctor: Doctor;
}

export interface SuperAdminAuthResponse {
  success: boolean;
  token: string;
  super_admin: SuperAdmin;
  message: string;
}

export interface HospitalAdminAuthResponse {
  success: boolean;
  message: string;
  token: string;
  hospital_admin: HospitalAdmin;
}

export interface UserAuthResponse {
  success: boolean;
  user: User;
  token: string;
  message: string;
}

export interface HospitalSearchResponse {
  success: boolean;
  message: string;
  page: number;
  totalPages: number;
  totalRecords: number;
  data: HospitalData[];
}

export interface DiseasePredictionResponse {
  success: boolean;
  message: string;
  disease: string;
}

export interface HospitalListResponse {
  success: boolean;
  message: string;
  hospitals: { id: string; name: string }[];
}

export interface ApproveDoctorsResponse {
  success: boolean;
  message: string;
  unapproved: { email: string; name: string; mobile: string }[];
}

export interface GenericResponse {
  success: boolean;
  message: string;
}

export interface ApproveHospitalAdminsResponse {
  success: boolean;
  message: string;
  unapproved: { email: string; name: string; hospital: HospitalData }[];
}

export interface ApproveSuperAdminsResponse {
  success: boolean;
  message: string;
  unapproved: { email: string }[];
}
