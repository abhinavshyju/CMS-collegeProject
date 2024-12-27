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
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const RoleModel = require("../../models/RoleModel.js");
const StaffModel = require("../../models/staffModel");
const FacultyModel = require("../../models/facultyModel");
const FacultyRoleModel = require("../../models/facultyRoleModel");
const router = Router();
router.post("/add-faculty", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const faculty_role = yield FacultyRoleModel.findOne({ role: role });
        const faculty = yield FacultyModel.create({
            name: name,
            email: email,
            password: password,
            role_id: faculty_role.id,
        });
        res
            .status(201)
            .json({ message: "Faculty created successfully", data: faculty });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.get("/get-faculty", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculty = yield FacultyModel.findAll({
            include: FacultyRoleModel,
        });
        if (!faculty) {
            res.status(404).json({ message: "Faculties are not found" });
        }
        const result = [];
        faculty.forEach((item) => {
            const obj = {
                id: item.id,
                name: item.name,
                email: item.email,
                role: item["faculty-role"].role,
            };
            result.push(obj);
        });
        res
            .status(200)
            .json({ message: "Faculty are found successfully", data: result });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
const staffSubRoute = require("./staffSubRoute.js");
router.use("/staff", staffSubRoute);
exports.default = router;
