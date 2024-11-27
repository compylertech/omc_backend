import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuelStationDto } from '../dto/create-fuel_station.dto';
import { UpdateFuelStationDto } from '../dto/update-fuel_station.dto';
import { FuelStation } from '../entities/fuel_station.entity';
import { FuelStationService } from 'src/modules/fuel_station_service/entities/fuel_station_service.entity';
import { Service } from 'src/modules/services/entities/service.entity';

@Injectable()
export class FuelStationsService {
  constructor(
    @InjectRepository(FuelStation)
    private fuelStationsRepository: Repository<FuelStation>,
    @InjectRepository(FuelStationService)
    private fuelStationServicesRepository: Repository<FuelStationService>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async create(
    createFuelStationDto: CreateFuelStationDto,
  ): Promise<FuelStation> {
    const { services, ...fuelStationData } = createFuelStationDto;

    const fuelStation = this.fuelStationsRepository.create({
      ...fuelStationData,
      manager: createFuelStationDto.manager
        ? { id: createFuelStationDto.manager }
        : undefined,
    });

    const savedFuelStation =
      await this.fuelStationsRepository.save(fuelStation);

    if (services && services.length > 0) {
      const serviceEntities = await this.servicesRepository.findByIds(services);
      const fuelStationServices = serviceEntities.map((service) => {
        return this.fuelStationServicesRepository.create({
          service,
          station: savedFuelStation,
        });
      });
      await this.fuelStationServicesRepository.save(fuelStationServices);
    }

    return savedFuelStation;
  }

  async findAll(): Promise<FuelStation[]> {
    return this.fuelStationsRepository.find();
  }

  async findOne(id: string): Promise<FuelStation> {
    const fuelStation = await this.fuelStationsRepository.findOne({
      where: { id },
    });
    if (!fuelStation) {
      throw new NotFoundException(`FuelStation with ID ${id} not found`);
    }
    return fuelStation;
  }

  async update(
    id: string,
    updateFuelStationDto: UpdateFuelStationDto,
  ): Promise<FuelStation> {
    const fuelStation = await this.fuelStationsRepository.preload({
      id,
      ...updateFuelStationDto,
      manager: updateFuelStationDto.manager
        ? { id: updateFuelStationDto.manager }
        : undefined,
    });
    if (!fuelStation) {
      throw new NotFoundException(`FuelStation with ID ${id} not found`);
    }
    return this.fuelStationsRepository.save(fuelStation);
  }

  async remove(id: string): Promise<void> {
    const fuelStation = await this.findOne(id);
    await this.fuelStationsRepository.remove(fuelStation);
  }
}
