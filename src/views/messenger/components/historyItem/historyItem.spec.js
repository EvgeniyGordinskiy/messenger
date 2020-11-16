import { shallowMount } from '@vue/test-utils'
import HistoryItem from '@/views/messenger/components/historyItem/HistoryItem'

describe('History Item', () => {
  let spy

  beforeAll(() => {
    spy = jest.spyOn(HistoryItem.filters, 'time')
    shallowMount(HistoryItem, {
      propsData: { item: { date: 1487076708000, text: 'Hello', senderId: 0 } },
    })
  })

  it('parse date string', () => {
    expect(spy).toHaveBeenCalledWith(1487076708000)
  })
})
