import { List } from 'immutable';

export function GetDayOfWeek(locale) {
    switch (locale) {
        case 'en':
            return List(['Sunday', 'Moday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
        case 'vi':
            return List(['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']);
        default:
            return List();
    }
}

export function GetMonthOfYear(locale) {
    switch (locale) {
        case 'en':
            return List(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
        case 'vi':
            return List(['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai']);
        default:
            return List();
    }
}

export function GetPrefixDay(locale, value) {
    switch (locale) {
        case 'en':
            if (value >> 0 < 10) {
                return `Day 0${value}`;
            }
            return `Day ${value}`;
        case 'vi':
            if (value >> 0 < 10) {
                return `Mùng 0${value}`;
            }
            return `Ngày ${value}`;
        default:
            return '';
    }
}

export function ConvertStringToInt(data) {
    if (data.match(/\d/gi) === null) {
        return '';
    }
    return (data.match(/\d/gi).toString().replace(/,/gi, '')) >> 0;
}

export function StandalEnglish(data) {
    // convert to lowercase
    // console.log(data);
    if (data !== null) {
        let slug = data.toLowerCase();
        // convert to english type
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        return slug;
    }
    return '';
}