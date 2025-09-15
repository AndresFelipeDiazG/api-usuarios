import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsuariosService {
  // Simulando una base de datos en memoria
  private users: User[] = [];
  // Contador para asignar IDs únicos empezando desde 1
  private idCounter = 1;

  create(createUsuarioDto: CreateUsuarioDto): User {
    // Verificar si el email ya existe
    const existEmail = this.users.find(
      (user) => user.email === createUsuarioDto.email.toLocaleLowerCase(),
    );

    if (existEmail) {
      throw new ConflictException('El email ya está en uso');
    }

    // Crear nuevo usuario
    const user: User = {
      id: this.idCounter++,
      ...createUsuarioDto,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return [...this.users];
  }

  findOne(id: number): User | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Verificación segura del email
    const emailToUpdate = updateUsuarioDto.email;

    if (emailToUpdate) {
      const existEmail = this.users.find(
        (user) =>
          user.id !== id &&
          user.email.toLowerCase() === emailToUpdate.toLowerCase(), //ya verificado arriba
      );

      if (existEmail) {
        throw new ConflictException('El email ya está en uso');
      }
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...updateUsuarioDto,
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: number): { message: string } {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    this.users.splice(userIndex, 1);
    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }
}
