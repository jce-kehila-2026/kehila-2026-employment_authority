/**
 * mock-data.js
 * Centralized mock data for demo purposes.
 * Includes articles from the Content Bot and events from the Annual Calendar.
 */

export const MOCK_ARTICLES = [
    {
        id: 1,
        title: "מענקי תעסוקה חדשים לשנת 2026",
        summary: "רשות התעסוקה מכריזה על סדרת מענקים למעסיקים המגייסים עובדים תושבי ירושלים.",
        source: "כלכליסט",
        date: "2026-04-20"
    },
    {
        id: 2,
        title: "איך לבנות מותג מעסיק בירושלים?",
        summary: "טיפים וכלים פרקטיים למשיכת כוח אדם איכותי במגזר הטכנולוגי בעיר.",
        source: "TheMarker",
        date: "2026-04-25"
    }
];

export const MOCK_EVENTS = [
    {
        id: 101,
        name: "כנס מעסיקים שנתי - מרכז העיר",
        location: "אולם מועצת העיר",
        date: "2026-05-15",
        time: "09:00",
        description: "מפגש נטוורקינג מקצועי עם רכזי הרשות."
    },
    {
        id: 102,
        name: "וובינר: דיני עבודה בעידן ה-AI",
        location: "Zoom",
        date: "2026-05-22",
        time: "16:00",
        description: "הדרכה משפטית למנהלי HR."
    }
];