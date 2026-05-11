import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Append connection pool params if not already in the URL.
    // Default: 10 connections max, 20s pool timeout.
    // Tune connection_limit based on your DB plan (e.g. 25 for Railway free tier).
    const rawUrl = process.env.DATABASE_URL ?? '';
    const pooledUrl =
      rawUrl && !rawUrl.includes('connection_limit')
        ? `${rawUrl}${rawUrl.includes('?') ? '&' : '?'}connection_limit=10&pool_timeout=20`
        : rawUrl;

    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      datasources: { db: { url: pooledUrl } },
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Helper method for transactions
  async executeTransaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    return this.$transaction(fn);
  }

  // Clean database (for testing)
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production');
    }

    const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_' && key[0] !== '$');

    return Promise.all(
      models.map((modelKey) => {
        const model = this[modelKey as string];
        if (model && typeof model.deleteMany === 'function') {
          return model.deleteMany();
        }
      }),
    );
  }
}
