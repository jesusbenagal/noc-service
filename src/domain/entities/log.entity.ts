export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, createdAt = new Date(), origin } = options;

    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static readonly fromJson = (json: string = "{}"): LogEntity => {
    json = json === "" ? "{}" : json;
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin: origin,
    });

    return log;
  };

  static readonly fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;

    const log = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin,
    });

    return log;
  };
}
