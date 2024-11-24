import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuelStationTransactionDto } from '../dto/create-fuel_station_transaction.dto';
import { UpdateFuelStationTransactionDto } from '../dto/update-fuel_station_transaction.dto';
import { FuelStationTransaction } from '../entities/fuel_station_transaction.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { FuelStationService } from 'src/modules/fuel_station_service/entities/fuel_station_service.entity';

@Injectable()
export class FuelStationTransactionService {
  constructor(
    @InjectRepository(FuelStationTransaction)
    private fuelStationTransactionRepository: Repository<FuelStationTransaction>,
    @InjectRepository(FuelStationService)
    private fuelStationServiceRepository: Repository<FuelStationService>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new fuel station transaction.
   *
   * @param createFuelStationTransactionDto - Data Transfer Object containing the details of the transaction to be created.
   * @returns A promise that resolves to the created FuelStationTransaction.
   * @throws NotFoundException - If the specified stationService or customer (if provided) does not exist.
   */
  async create(
    createFuelStationTransactionDto: CreateFuelStationTransactionDto,
  ): Promise<FuelStationTransaction> {
    const { stationService, customer, ...transactionData } =
      createFuelStationTransactionDto;

    // Check if the stationService exists
    const stationServiceEntity =
      await this.fuelStationServiceRepository.findOne({
        where: { id: stationService },
      });
    if (!stationServiceEntity) {
      throw new NotFoundException(
        `FuelStationService with ID ${stationService} not found`,
      );
    }

    // Check if the customer exists, if provided
    let customerEntity: User | null = null;
    if (customer) {
      customerEntity = await this.userRepository.findOne({
        where: { id: customer },
      });
      if (!customerEntity) {
        throw new NotFoundException(`Customer with ID ${customer} not found`);
      }
    }

    const fuelStationTransaction = this.fuelStationTransactionRepository.create(
      {
        ...transactionData,
        stationService: stationServiceEntity,
        customer: customerEntity,
      } as FuelStationTransaction,
    );

    return this.fuelStationTransactionRepository.save(fuelStationTransaction);
  }

  /**
   * Retrieves all fuel station transactions from the repository.
   *
   * @returns {Promise<FuelStationTransaction[]>} A promise that resolves to an array of FuelStationTransaction objects.
   */
  async findAll(): Promise<FuelStationTransaction[]> {
    return this.fuelStationTransactionRepository.find();
  }

  async findOne(id: string): Promise<FuelStationTransaction> {
    const fuelStationTransaction =
      await this.fuelStationTransactionRepository.findOne({
        where: { id: id },
      });
    if (!fuelStationTransaction) {
      throw new NotFoundException(
        `FuelStationTransaction with ID ${id} not found`,
      );
    }
    return fuelStationTransaction;
  }

  async update(
    id: string,
    updateFuelStationTransactionDto: UpdateFuelStationTransactionDto,
  ): Promise<FuelStationTransaction> {
    const fuelStationTransaction =
      await this.fuelStationTransactionRepository.preload({
        id,
        ...updateFuelStationTransactionDto,
        stationService: updateFuelStationTransactionDto.stationService
          ? { id: updateFuelStationTransactionDto.stationService }
          : undefined,
        customer: updateFuelStationTransactionDto.customer
          ? { id: updateFuelStationTransactionDto.customer }
          : undefined,
      });
    if (!fuelStationTransaction) {
      throw new NotFoundException(
        `FuelStationTransaction with ID ${id} not found`,
      );
    }
    return this.fuelStationTransactionRepository.save(fuelStationTransaction);
  }

  async remove(id: string): Promise<void> {
    const fuelStationTransaction = await this.findOne(id);
    await this.fuelStationTransactionRepository.remove(fuelStationTransaction);
  }
}
