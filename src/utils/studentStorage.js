const STUDENTS_KEY = "studentPortalStudents";
const CURRENT_STUDENT_KEY = "studentPortalCurrentStudentEmail";
const OLD_STUDENTS_KEY = "students";

export function getStudents() {
  try {
    const savedStudents =
      localStorage.getItem(STUDENTS_KEY) ||
      localStorage.getItem(OLD_STUDENTS_KEY);

    const parsedStudents = savedStudents
      ? JSON.parse(savedStudents)
      : [];

    if (!Array.isArray(parsedStudents)) {
      return [];
    }

    return parsedStudents.map((student) => ({
      ...student,
      fullName: student.fullName || student.name || "Student",
      registrationNumber:
        student.registrationNumber ||
        student.regNo ||
        "Not added"
    }));
  } catch {
    return [];
  }
}

export function saveStudents(students) {
  localStorage.setItem(
    STUDENTS_KEY,
    JSON.stringify(students)
  );
}

export function getCurrentStudentEmail() {
  return localStorage.getItem(CURRENT_STUDENT_KEY);
}

export function setCurrentStudentEmail(email) {
  localStorage.setItem(CURRENT_STUDENT_KEY, email);
}

export function clearCurrentStudent() {
  localStorage.removeItem(CURRENT_STUDENT_KEY);
}
