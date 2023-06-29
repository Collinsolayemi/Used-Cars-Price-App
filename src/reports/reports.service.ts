import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../users/entiites/report.entity';
import { CreateReportDto } from '../users/dtos/reports.dto';
import { User } from 'src/users/entiites/users.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.reportRepository.create(reportDto);
    report.user = user
    return this.reportRepository.save(report);
  }
}
