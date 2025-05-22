import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'El correo electrónico ya está en uso' },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await hash(password, 12);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { user: userWithoutPassword, message: 'Usuario registrado exitosamente' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en el registro:', error);
    return NextResponse.json(
      { message: 'Error al registrar el usuario' },
      { status: 500 }
    );
  }
}