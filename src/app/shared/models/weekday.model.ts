export enum WeekdayHead {
    MON = 1,
    TUE = 2,
    WED = 3,
    THU = 4,
    FRI = 5,
    SAT = 6,
    SUN = 7
}

export const weekdayModel = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

export class WeekdayUtil {
    // static getToday(): number {
    //     const d = new Date();
    //     return d.getDay() === 0 ? 7 : d.getDay();
    // }
    static getDayName(dayNumber: number): string {
        return dayNumber == 0 ? 'Sunday' :
               dayNumber == 1 ? 'Monday' :
               dayNumber == 2 ? 'Tuesday' :
               dayNumber == 3 ? 'Wednesday' :
               dayNumber == 4 ? 'Thursday' :
               dayNumber == 5 ? 'Friday' :
               dayNumber == 6 ? 'Saturday' : ''
    }
}