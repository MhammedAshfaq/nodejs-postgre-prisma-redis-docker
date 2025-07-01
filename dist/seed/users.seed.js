"use strict";
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
exports.seedUsers = seedUsers;
const logger_1 = __importDefault(require("../logger/logger"));
function seedUsers(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [
            {
                name: "Ashfaq Mohammed",
                email: "ashfaq@example.com",
                password: "123456",
                Address: {
                    create: [
                        {
                            address1: "123 Main Street",
                            address2: "Near Mosque",
                            city: "Kozhikode",
                            state: "Kerala",
                            district: "Kozhikode",
                        },
                    ],
                },
            },
            {
                name: "Hisana Sharafudheen",
                email: "hisana@example.com",
                password: "abcdef",
                Address: {
                    create: [
                        {
                            address1: "456 Garden Lane",
                            address2: "Opp Park",
                            city: "Malappuram",
                            state: "Kerala",
                            district: "Malappuram",
                        },
                        {
                            address1: "Apartment B-12",
                            address2: "Sky Residency",
                            city: "Kochi",
                            state: "Kerala",
                            district: "Ernakulam",
                        },
                    ],
                },
            },
            {
                name: "Afeef Kader",
                email: "afeef@example.com",
                password: "qwerty",
                Address: {
                    create: [
                        {
                            address1: "789 Sea Road",
                            address2: "Near Beach",
                            city: "Kannur",
                            state: "Kerala",
                            district: "Kannur",
                        },
                    ],
                },
            },
        ];
        for (const user of users) {
            yield prisma.users.create({ data: user });
        }
        logger_1.default.info("✅ Multiple users seeded");
    });
}
