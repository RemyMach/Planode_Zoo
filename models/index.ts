import {ModelCtor, Sequelize} from "sequelize";
import userCreator, {UserInstance} from "./user.model";
import sessionCreator, {SessionInstance} from "./session.model";
import {Dialect} from "sequelize/types/lib/sequelize";
import roleCreator, {RoleInstance } from "./role.model";
import jobCreator, { JobInstance } from "./job.model";
import speciesCreator, { SpeciesInstance } from "./species.model";
import raceCreator, { RaceInstance } from "./race.model";
import animalCreator, { AnimalInstance } from "./animal.model";
import healthcareCreator, { HealthcareInstance } from "./healthcare.model";
import locationCreator, { LocationInstance } from "./location.model";
import areaCreator, { AreaInstance } from "./area.model";
import weekCreator, { WeekInstance } from "./week.model";
import presenceCreator, { PresenceInstance } from "./presence.model";
import { MaintainController } from "../controllers/maintain.controller";
import maintainCreator, { MaintainInstance } from "./maintain.model";

export interface SequelizeManagerProps {
    sequelize: Sequelize;
    user: ModelCtor<UserInstance>;
    session: ModelCtor<SessionInstance>;
    role: ModelCtor<RoleInstance>;
    job: ModelCtor<JobInstance>;
    week: ModelCtor<WeekInstance>;
    presence: ModelCtor<PresenceInstance>;
    maintain: ModelCtor<MaintainInstance>;

    species: ModelCtor<SpeciesInstance>;
    race: ModelCtor<RaceInstance>;
    animal: ModelCtor<AnimalInstance>;
    healthcare: ModelCtor<HealthcareInstance>;
    location: ModelCtor<LocationInstance>;
    area: ModelCtor<AreaInstance>;
}

export class SequelizeManager implements SequelizeManagerProps {

    private static instance?: SequelizeManager

    sequelize: Sequelize;
    user: ModelCtor<UserInstance>;
    session: ModelCtor<SessionInstance>;
    role: ModelCtor<RoleInstance>;
    job: ModelCtor<JobInstance>;
    week: ModelCtor<WeekInstance>;
    presence: ModelCtor<PresenceInstance>;
    maintain: ModelCtor<MaintainInstance>;

    species: ModelCtor<SpeciesInstance>;
    race: ModelCtor<RaceInstance>;
    animal: ModelCtor<AnimalInstance>;
    healthcare: ModelCtor<HealthcareInstance>;
    location: ModelCtor<LocationInstance>;
    area: ModelCtor<AreaInstance>;

    public static async getInstance(): Promise<SequelizeManager> {
        if(SequelizeManager.instance === undefined) {
            SequelizeManager.instance = await SequelizeManager.initialize();
        }
        return SequelizeManager.instance;
    }

    private static async initialize(): Promise<SequelizeManager> {
        const sequelize = new Sequelize({
            dialect: process.env.DB_DRIVER as Dialect,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number.parseInt(process.env.DB_PORT as string)
        });
        await sequelize.authenticate();
        const managerProps: SequelizeManagerProps = {
            sequelize,
            user: userCreator(sequelize),
            session: sessionCreator(sequelize),
            role: roleCreator(sequelize),
            job: jobCreator(sequelize),
            week: weekCreator(sequelize),
            presence: presenceCreator(sequelize),
            maintain: maintainCreator(sequelize),

            species: speciesCreator(sequelize),
            race: raceCreator(sequelize),
            animal: animalCreator(sequelize),
            healthcare: healthcareCreator(sequelize),
            location: locationCreator(sequelize),
            area: areaCreator(sequelize)
        }
        SequelizeManager.associate(managerProps);
        await sequelize.sync({force: true});
        return new SequelizeManager(managerProps);
    }

    private static associate(props: SequelizeManagerProps): void {

        props.user.hasMany(props.session); // User N Session
        props.session.belongsTo(props.user, {foreignKey: 'user_id'}); // Session 1 User

        //props.user.belongsToMany(props.role, { through: 'User_Role' });
        //props.role.belongsToMany(props.user, { through: 'User_Role' });
        props.user.belongsTo(props.role, {foreignKey: 'role_id'}); // User 1 Role
        props.role.hasMany(props.user); // Role 1 User

        props.job.hasMany(props.user); // Job N User
        props.user.belongsTo(props.job, {foreignKey: 'job_id'}); // User 1 Job

        props.user.belongsToMany(props.week, {through: props.presence, foreignKey: 'user_id'})
        props.week.belongsToMany(props.user, {through: props.presence, foreignKey: 'week_id'})

        props.maintain.belongsToMany(props.user, {through: 'User_Maintain', foreignKey: 'maintain_id'})
        props.user.belongsToMany(props.maintain, {through: 'User_Maintain', foreignKey: 'user_id'})

        props.maintain.belongsTo(props.area, {foreignKey: 'area_id'});
        props.area.hasMany(props.maintain);


        //Association for species table
        props.species.hasMany(props.race);

        //Association for race table
        props.race.belongsTo(props.species, {foreignKey: 'species_id'});
        props.race.hasMany(props.animal);

        //Association for animal table
        props.animal.belongsTo(props.race, {foreignKey: 'race_id'});
        props.animal.hasMany(props.healthcare);
        props.animal.hasOne(props.location);

        //Association for healthcare table
        props.healthcare.belongsTo(props.animal, {foreignKey: 'animal_id'});

        //Association for location table
        props.location.belongsTo(props.area, {foreignKey: 'area_id'});
        props.location.belongsTo(props.animal, {foreignKey: 'animal_id'});

        //Association for area table
        props.area.hasMany(props.location);
    }

    private constructor(props: SequelizeManagerProps) {
        this.sequelize = props.sequelize;
        this.user = props.user;
        this.session = props.session;
        this.role = props.role;
        this.job = props.job;
        this.week = props.week;
        this.presence = props.presence;
        this.maintain = props.maintain;

        this.species = props.species;
        this.race = props.race;
        this.animal = props.animal;
        this.healthcare = props.healthcare;
        this.location = props.location;
        this.area = props.area;
    }
}