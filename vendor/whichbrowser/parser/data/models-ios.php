<?php

namespace WhichBrowser\Data;

use WhichBrowser\Constants\DeviceType;

DeviceModels::$IOS_MODELS = [

    /* Generic names */
    'iPhone'                                    => [ 'Apple', 'iPhone', DeviceType::MOBILE ],
    'iPhone 3G'                                 => [ 'Apple', 'iPhone 3G', DeviceType::MOBILE ],
    'iPhone 3GS'                                => [ 'Apple', 'iPhone 3GS', DeviceType::MOBILE ],
    'iPhone 4'                                  => [ 'Apple', 'iPhone 4', DeviceType::MOBILE ],
    'iPhone 4S'                                 => [ 'Apple', 'iPhone 4S', DeviceType::MOBILE ],
    'iPhone 5'                                  => [ 'Apple', 'iPhone 5', DeviceType::MOBILE ],
    'iPhone 5c'                                 => [ 'Apple', 'iPhone 5c', DeviceType::MOBILE ],
    'iPhone 5s'                                 => [ 'Apple', 'iPhone 5s', DeviceType::MOBILE ],
    'iPhone 6'                                  => [ 'Apple', 'iPhone 6', DeviceType::MOBILE ],
    'iPhone 6 Plus'                             => [ 'Apple', 'iPhone 6 Plus', DeviceType::MOBILE ],
    'iPod'                                      => [ 'Apple', 'iPod touch', DeviceType::MEDIA ],
    'iPod touch'                                => [ 'Apple', 'iPod touch', DeviceType::MEDIA ],
    'iPad'                                      => [ 'Apple', 'iPad', DeviceType::TABLET ],

    /* Offical gestalt names */
    'iPhone1,1'                                 => [ 'Apple', 'iPhone', DeviceType::MOBILE ],
    'iPhone1,2'                                 => [ 'Apple', 'iPhone 3G', DeviceType::MOBILE ],
    'iPhone2,1'                                 => [ 'Apple', 'iPhone 3GS', DeviceType::MOBILE ],
    'iPhone3,1'                                 => [ 'Apple', 'iPhone 4', DeviceType::MOBILE ],
    'iPhone3,2'                                 => [ 'Apple', 'iPhone 4', DeviceType::MOBILE ],
    'iPhone3,3'                                 => [ 'Apple', 'iPhone 4', DeviceType::MOBILE ],
    'iPhone4,1'                                 => [ 'Apple', 'iPhone 4S', DeviceType::MOBILE ],
    'iPhone5,1'                                 => [ 'Apple', 'iPhone 5', DeviceType::MOBILE ],
    'iPhone5,2'                                 => [ 'Apple', 'iPhone 5', DeviceType::MOBILE ],
    'iPhone5,3'                                 => [ 'Apple', 'iPhone 5c', DeviceType::MOBILE ],
    'iPhone5,4'                                 => [ 'Apple', 'iPhone 5c', DeviceType::MOBILE ],
    'iPhone6,1'                                 => [ 'Apple', 'iPhone 5s', DeviceType::MOBILE ],
    'iPhone6,2'                                 => [ 'Apple', 'iPhone 5s', DeviceType::MOBILE ],
    'iPhone7,1'                                 => [ 'Apple', 'iPhone 6 Plus', DeviceType::MOBILE ],
    'iPhone7,2'                                 => [ 'Apple', 'iPhone 6', DeviceType::MOBILE ],
    'iPhone8,1'                                 => [ 'Apple', 'iPhone 6s', DeviceType::MOBILE ],
    'iPhone8,2'                                 => [ 'Apple', 'iPhone 6s Plus', DeviceType::MOBILE ],
    'iPhone8,4'                                 => [ 'Apple', 'iPhone SE', DeviceType::MOBILE ],
    'iPod1,1'                                   => [ 'Apple', 'iPod touch', DeviceType::MEDIA ],
    'iPod2,1'                                   => [ 'Apple', 'iPod touch (2nd gen)', DeviceType::MEDIA ],
    'iPod3,1'                                   => [ 'Apple', 'iPod touch (3rd gen)', DeviceType::MEDIA ],
    'iPod4,1'                                   => [ 'Apple', 'iPod touch (4th gen)', DeviceType::MEDIA ],
    'iPod5,1'                                   => [ 'Apple', 'iPod touch (5th gen)', DeviceType::MEDIA ],
    'iPod7,1'                                   => [ 'Apple', 'iPod touch (6th gen)', DeviceType::MEDIA ],
    'iPad1,1'                                   => [ 'Apple', 'iPad', DeviceType::TABLET ],
    'iPad1,2'                                   => [ 'Apple', 'iPad 2', DeviceType::TABLET ],
    'iPad2,1'                                   => [ 'Apple', 'iPad 2', DeviceType::TABLET ],
    'iPad2,2'                                   => [ 'Apple', 'iPad 2', DeviceType::TABLET ],
    'iPad2,3'                                   => [ 'Apple', 'iPad 2', DeviceType::TABLET ],
    'iPad2,4'                                   => [ 'Apple', 'iPad 2', DeviceType::TABLET ],
    'iPad2,5'                                   => [ 'Apple', 'iPad mini', DeviceType::TABLET ],
    'iPad2,6'                                   => [ 'Apple', 'iPad mini', DeviceType::TABLET ],
    'iPad2,7'                                   => [ 'Apple', 'iPad mini', DeviceType::TABLET ],
    'iPad3,1'                                   => [ 'Apple', 'iPad (3rd gen)', DeviceType::TABLET ],
    'iPad3,2'                                   => [ 'Apple', 'iPad (3rd gen)', DeviceType::TABLET ],
    'iPad3,3'                                   => [ 'Apple', 'iPad (3rd gen)', DeviceType::TABLET ],
    'iPad3,4'                                   => [ 'Apple', 'iPad (4th gen)', DeviceType::TABLET ],
    'iPad3,5'                                   => [ 'Apple', 'iPad (4th gen)', DeviceType::TABLET ],
    'iPad3,6'                                   => [ 'Apple', 'iPad (4th gen)', DeviceType::TABLET ],
    'iPad4,1'                                   => [ 'Apple', 'iPad Air', DeviceType::TABLET ],
    'iPad4,2'                                   => [ 'Apple', 'iPad Air', DeviceType::TABLET ],
    'iPad4,3'                                   => [ 'Apple', 'iPad Air', DeviceType::TABLET ],
    'iPad4,4'                                   => [ 'Apple', 'iPad mini 2', DeviceType::TABLET ],
    'iPad4,5'                                   => [ 'Apple', 'iPad mini 2', DeviceType::TABLET ],
    'iPad4,6'                                   => [ 'Apple', 'iPad mini 2', DeviceType::TABLET ],
    'iPad4,7'                                   => [ 'Apple', 'iPad mini 3', DeviceType::TABLET ],
    'iPad4,8'                                   => [ 'Apple', 'iPad mini 3', DeviceType::TABLET ],
    'iPad5,1'                                   => [ 'Apple', 'iPad mini 4', DeviceType::TABLET ],
    'iPad5,2'                                   => [ 'Apple', 'iPad mini 4', DeviceType::TABLET ],
    'iPad5,3'                                   => [ 'Apple', 'iPad Air 2', DeviceType::TABLET ],
    'iPad5,4'                                   => [ 'Apple', 'iPad Air 2', DeviceType::TABLET ],
    'iPad6,3'                                   => [ 'Apple', 'iPad Pro (9.7″)', DeviceType::TABLET ],
    'iPad6,4'                                   => [ 'Apple', 'iPad Pro (9.7″)', DeviceType::TABLET ],
    'iPad6,7'                                   => [ 'Apple', 'iPad Pro (12.9″)', DeviceType::TABLET ],
    'iPad6,8'                                   => [ 'Apple', 'iPad Pro (12.9″)', DeviceType::TABLET ],
];