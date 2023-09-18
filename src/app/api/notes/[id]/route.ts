import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from '@prisma/client';



interface Params {
    params: { id: string };
}

export async function GET(req: Request, { params }: Params) {

    try {
        const note = await prisma.note.findFirst({
            where: {
                id: Number(params.id)
            }
        })
        if (!note) {
            return NextResponse.json({ message: "Note not found" }, { status: 404 })
        } else {
            return NextResponse.json(note);
        }
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


export async function DELETE(req: Request, { params }: Params) {
    try {
        const deletedNote = await prisma.note.delete({
            where: {
                id: Number(params.id)
            }
        })
        if (!deletedNote) {
            return NextResponse.json({ message: "Note not found" }, { status: 404 })
        } else {
            return NextResponse.json(deletedNote);
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json(
                    {
                        message: "Note not found"
                    },
                    {
                        status: 404
                    });

            } else {
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
}

export async function PUT(req: Request, { params }: Params) {

    try {
        const { title, content } = await req.json();
        const updatedNote = await prisma.note.update({
            where: {
                id: Number(params.id)
            },
            data: {
                title,
                content
            }
        })
        return NextResponse.json(updatedNote);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json(
                    {
                        message: "Note not found"
                    },
                    {
                        status: 404
                    });

            } else {
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
}