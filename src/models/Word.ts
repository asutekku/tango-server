export class Word {
    assignment_id: number;
    subject_id: number;
    value: string;

    constructor(assignment_id: number, subject_id: number, value: string) {
        this.assignment_id = assignment_id;
        this.subject_id = subject_id;
        this.value = value;
    }
}