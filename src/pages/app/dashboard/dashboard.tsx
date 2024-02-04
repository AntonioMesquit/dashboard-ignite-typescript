import { Helmet } from 'react-helmet-async'

import { DayOrdersCard } from './day-orders-month'
import { MonthCanceledOrdersCard } from './month-canceled-orders-card'
import { MonthCard } from './month-card'
import { MonthOrdersCard } from './month-orders-card'
import { PopularProducts } from './popular-products'
import { RevenueChart } from './revenue-chart'
export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <MonthCard />
          <MonthOrdersCard />
          <DayOrdersCard />
          <MonthCanceledOrdersCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProducts />
        </div>
      </div>
    </>
  )
}
