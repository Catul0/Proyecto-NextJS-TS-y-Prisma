import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
    try {
        const notes = await prisma.note.findMany()
        console.log(notes)
        return NextResponse.json(notes)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message
                },
                {
                    status: 500
                });
        }
    }

}

export async function POST(req: Request) {
    try {
        const { title, content } = await req.json()
        const newNote = await prisma.note.create({
            data: {
                title,
                content,
            }
        })
        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message
                },
                {
                    status: 500
                });
        }
    }
}