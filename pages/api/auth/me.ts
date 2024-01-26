import { NextApiRequest, NextApiResponse } from "next";
import * as jose from 'jose';
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { useReducer } from "react";


const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const bearerToken = req.headers["authorization"] as string;
    const token = bearerToken.split(" ")[1];
    const payload = jwt.decode(token) as { email: string };

    if (!payload.email) {
        return res.status(401).json({
            errorMessage: "Unauthorized request"
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            city: true,
            phone: true,
        }
    });

    if (!user) {
        res.status(401).json({
            errorMessage: "User not found"
        });
    }

    return res.status(200).json({
        id: user?.id,
        firstName: user?.first_name,
        lastName: user?.last_name,
        email: user?.email,
        city: user?.city,
        phone: user?.phone,
    });

}