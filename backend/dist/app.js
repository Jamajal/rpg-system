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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT || 3000;
const MONGOURL = 'mongodb+srv://leandroLiberio:MAAN0w1MTuZHVRtt@cluster0.phqg4xf.mongodb.net/';
const app = (0, express_1.default)();
//app.use(json());
//app.use(urlencoded({ extended: true }));
//app.use('/todos', todoRoutes);
mongoose_1.default
    .connect(MONGOURL)
    .then(() => {
    console.log('Database is connected successfully.');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => console.log(error));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
});
const UserModel = mongoose_1.default.model('user', userSchema);
app.get('/getUsers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield UserModel.find();
    res.json(userData);
}));
