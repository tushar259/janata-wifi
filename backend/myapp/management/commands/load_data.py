# myapp/management/commands/load_stock_data.py
import os
import json
from django.core.management.base import BaseCommand
from django.conf import settings
from myapp.models import StockData

class Command(BaseCommand):
    help = 'Load stock data from JSON file into the database'

    def handle(self, *args, **kwargs):
        file = json.load(open(os.path.join(settings.BASE_DIR, 'public', 'files', 'stock_market_data.json'), 'r'))
        for data in file:
            StockData.objects.create(
                date=data['date'],
                trade_code=data['trade_code'],
                high=data['high'],
                low=data['low'],
                open=data['open'],
                close=data['close'],
                volume=data['volume'],
            )
        self.stdout.write(self.style.SUCCESS('Successfully loaded stock data'))
