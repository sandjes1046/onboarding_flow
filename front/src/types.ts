export type database_users = {
    email:string;
    password:string;
    complete:boolean;
    step:number;
    about_me:string;
    street:string;
    city:string;
    state:string;
    zip:number;
    birthday:string;
}

export type OnboardingFieldDetail = {
title: string;
step: number;
};


export type OnboardingFields = Record<string, OnboardingFieldDetail>;


export type database_admin = {
    [key:string]: OnboardingFields;
};

