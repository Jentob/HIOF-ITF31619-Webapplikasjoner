import { useState } from "react";
import { Student } from "../types";
import studentJson from "../../../config/student.json";

function useStudent() {
    const [student, setStudent] = useState<Student>(studentJson);

    return {
        student,
    };
}

export { useStudent };
