import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../users/entiites/report.entity';
import { CreateReportDto } from '../users/dtos/reports.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

  create(reportDto: CreateReportDto) {
    const report = this.reportRepository.create(reportDto);
    return this.reportRepository.save(report);
  }
}
