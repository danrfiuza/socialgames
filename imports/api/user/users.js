import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

SimpleSchema.messages({
    "passwordMismatch": "Passwords do not match"
});

export const UserProfile = new SimpleSchema({
    name: {
        type: String,
    },
});

export const UserSchema  = new SimpleSchema({
    // username: {
    //     type: String,
    // },
    emails: {
        type: Array,
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: UserProfile,
        optional: true
    },
    services: {
        type: Object,
        blackbox: true
    },
    // roles: {
    //     type: Object,
    //     optional: true,
    //     blackbox: true
    // },
    // roles: {
    //     type: Array,
    //     optional: true
    // },
    // 'roles.$': {
    //     type: String
    // }
});

Meteor.users.attachSchema(UserSchema);