"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// MIT License
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
// Copyright (c) 2021 Emmadi Sumith Kumar
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const awesome_phonenumber_1 = require("awesome-phonenumber");
const axios_1 = __importDefault(require("axios"));
/**
 * Verifying mobile number with OTP
 *
 * @name truecallerjs.verifyOtp
 * @function verifyOtp
 * @param {string} phonenumber - Phone number in international format.
 * @param {Object} json_data - JSON response of the login(phonenumber) function.
 * @param {string} otp - 6-digit OTP.
 * @returns {Promise<Object>} - JSON output containing the installationId.
 *
 * Follow this documentation for more details: https://github.com/sumithemmadi/truecallerjs/tree/main/docs
 */
function verifyOtp(phonenumber, json_data, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const pn = (0, awesome_phonenumber_1.parsePhoneNumber)(phonenumber);
        if (!pn.valid) {
            throw new Error("Phone number should be in international format.");
        }
        const postData = {
            countryCode: pn.regionCode,
            dialingCode: pn.countryCode,
            phoneNumber: pn.number.significant,
            requestId: json_data.requestId,
            token: otp,
        };
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "accept-encoding": "gzip",
                "user-agent": "Truecaller/11.75.5 (Android;10)",
                clientsecret: "lvc22mp3l1sfv6ujg83rd17btt",
            },
            url: "https://account-asia-south1.truecaller.com/v1/verifyOnboardingOtp",
            data: postData,
        };
        const res = yield (0, axios_1.default)(options);
        return res.data;
    });
}
exports.verifyOtp = verifyOtp;
