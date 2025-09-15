import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100, { message: 'El nombre es demasiado largo' })
  nombre: string;

  @ApiProperty({
    example: 'jhondoe@example.com',
    description: 'Correo electrónico del usuario',
    maxLength: 100,
  })
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El email es demasiado largo' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;
}
