// 移除全局命名空间，改为模块导出
// 这样确保只能通过按需导入使用，而不能通过全局 BasicTypes 使用

export interface DefaultBaseHeader {
    Authorization?: string;
    'User-Agent'?: string;
    'Accept-Language'?: string;
    'X-Locale'?: Locale;
    'X-Timestamp'?: number;
    'X-Request-Id'?: string;
    'X-Device-Id'?: string;
    'X-Real-IP'?: string;
    'X-IP-Country'?: string;
    'X-IP-Region'?: string;
    'X-IP-City'?: string;
    'X-Sign'?: string;
}

export interface DefaultResponseWrapper<T> {
    success: boolean;
    data?: T;
    error?: ErrorDetails;
}

export interface ErrorDetails {
    code: number;
    message: string;
    type: ErrType;
}

export interface PublicUploadCredentials {
    uploadRequest: Request;
    accessUrl: string;
}

export interface Request {
    headers: Record<string,string> | null;
    url: string;
    method: string;
}

export interface SigningRequest {
    name: string;
    contentType: ContentType;
    size: number;
}

export type ContentType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/bmp' | 'image/svg+xml' | 'image/tiff' | 'audio/mpeg' | 'audio/wav' | 'audio/ogg' | 'audio/flac' | 'audio/aac' | 'video/mp4' | 'video/mpeg' | 'video/webm' | 'video/x-msvideo' | 'video/quicktime' | 'text/plain' | 'text/html' | 'text/css' | 'text/javascript' | 'text/markdown' | 'text/csv' | 'application/json' | 'application/xml' | 'application/pdf' | 'application/zip' | 'application/gzip' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' | 'application/x-www-form-urlencoded' | 'application/octet-stream' | 'application/rtf' | 'application/javascript';

// 852: Hong Kong, 1: Canada, 44: United Kingdom, 61: Australia, 91: India, 49: Germany, 33: France, 81: Japan, 82: South Korea, 65: Singapore, 66: Thailand, 84: Vietnam, 62: Indonesia, 60: Malaysia, 39: Italy, 7: Russia, 55: Brazil, 27: South Africa, 52: Mexico, 54: Argentina, 56: Chile, 57: Colombia, 966: Saudi Arabia, 971: United Arab Emirates, 20: Egypt, 90: Turkey, 34: Spain, 351: Portugal, 31: Netherlands, 86: China, 41: Switzerland, 46: Sweden, 45: Denmark, 47: Norway, 64: New Zealand, 92: Pakistan, 880: Bangladesh, 94: Sri Lanka, 977: Nepal
export type CountryCode = '852' | '1' | '1' | '44' | '61' | '91' | '49' | '33' | '81' | '82' | '65' | '66' | '84' | '62' | '60' | '39' | '7' | '55' | '27' | '52' | '54' | '56' | '57' | '966' | '971' | '20' | '90' | '34' | '351' | '31' | '86' | '41' | '46' | '45' | '47' | '64' | '92' | '880' | '94' | '977' | '95' | '63' | '972';

export type ErrType = 'internal' | 'not_found' | 'validation' | 'authentication' | 'authorization' | 'rate_limit' | 'network' | 'timeout' | 'concurrency';

// un_know: UnKnow, male: Male, female: Female
export type Gender = 'un_know' | 'male' | 'female';

export type Locale = '' | 'zh-CN' | 'zh-TW' | 'zh-HK' | 'en-US' | 'en-GB' | 'en-AU' | 'en-CA' | 'en-IN' | 'fr-FR' | 'fr-CA' | 'de-DE' | 'fil-PH' | 'de-CH' | 'es-ES' | 'es-MX' | 'es-US' | 'ja-JP' | 'ko-KR' | 'ru-RU' | 'pt-BR' | 'pt-PT' | 'ar-SA' | 'ar-EG' | 'hi-IN' | 'it-IT' | 'it-CH' | 'nl-NL' | 'nl-BE' | 'pl-PL' | 'vi-VN' | 'th-TH' | 'el-GR' | 'tr-TR' | 'sv-SE';

export type Platform = 'pc' | 'android' | 'ios';
