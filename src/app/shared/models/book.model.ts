export interface Book {
    bookId?: number;
    partnerId?: number;
    topicId?: number;
    status?: string;
    workflowId?: number;
    approvedBy?: number;
    bookname?: string;
    originCountry?: string;
    certificate?: boolean;
    description?: string;
    details?: string;
    originLanguage?: string;
    posterurl?: string;
    landscapeUrl?: string;
    trailerurl?: string;
    bannerurl?: string;
    onlinePercent?: number;
    duration?: string;
    durationperweek?: string;
    durationperday?: string;
    bookYear?: string;
    experienceRating?: string;
    level?: string;
    authorName?: string;
    authorComments?: string[];
    authorId?:string;
    outcomes?: string[];
    faq?: string[];
    curriculam?: string[];
    expectedMoney?: string;
    isBanner?: string;
    isTrending?: string;
    isFeatured?: string;
    comment?: string;
    date?: Date;
    effectiveDate?: Date;
    expiryDate?: Date;
    userRating?: number;
    appRating?: number;
    cost?: string;
    currency?: string;
    subtitles?: string[];
    audiolanguages?: string[];
    category?: number[];
    categoryDesc?: string[];
    countriesAccess?: string[];
    
}
