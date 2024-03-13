import Navbar from '@/components/navbar'
import { Today } from '@/utils'
import * as actions from '@/actions'
import { RenderExpenses, RenderSales } from '@/components/render-log'

export default async function Home() {
  const todayStr = Today.toLocaleDateString('pt-br', { dateStyle: 'long' })
  const dailyLog = await actions.getDailyLogs()

  return (
    <>
      <div className="w-full">
        <h1 className="mb-5 min-w-[180px] rounded-xl border bg-white p-2 text-center text-lg font-medium shadow">
          {todayStr}
        </h1>
        <Navbar />
      </div>
      <div className="flex flex-col items-center">
        <RenderSales data={dailyLog.sales} />
        <RenderExpenses data={dailyLog.expenses} />
      </div>
    </>
  )
}
