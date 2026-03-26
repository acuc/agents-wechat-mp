import type { Payment } from '../types/domain'

export function displayStudentEmail(studentName: string, studentEmail?: string): string {
  return (
    studentEmail ?? `${studentName.toLowerCase().replace(/\s+/g, '.')}@example.com`
  )
}

export function paymentStudentEmail(payment: Payment): string {
  return displayStudentEmail(payment.studentName, payment.studentEmail)
}
