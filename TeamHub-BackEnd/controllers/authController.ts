import { Response , Request , NextFunction } from "express";
import { User } from "../models/userDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        next(error);
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET , { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        next(error);
    }
}

export { registerUser, loginUser };
