import { Repository } from 'typeorm';
import { NetworkRelation } from './entities/network.entity';
export declare class NetworkService {
    private networkRepository;
    constructor(networkRepository: Repository<NetworkRelation>);
    registrarRelacion(data: any): Promise<NetworkRelation[]>;
    obtenerRedCompleta(): Promise<NetworkRelation[]>;
}
