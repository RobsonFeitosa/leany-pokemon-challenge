export class BaseMapper {
    static toPersistence<D extends object, P extends object>(
        domain: D,
        PersistenceClass: new () => P
    ): P {
        const persistence = new PersistenceClass();

        Object.assign(persistence, domain);

        return persistence;
    }

    static toDomain<P extends object, D extends object>(
        persistence: P,
        DomainClass: new (props: any) => D
    ): D {
        return new DomainClass(persistence);
    }
}