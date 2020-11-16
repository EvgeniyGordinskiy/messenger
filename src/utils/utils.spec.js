import { timeFilter } from '@/utils/index'

describe('Utils', () => {
  describe('timeFilter', () => {
    it('trow an error on wrong format data', () => {
      expect(() => timeFilter('23:15:30 GMT+0200')).toThrowError('Wrong format data')
    })
    it('parses a unix timestamp', () => {
      expect(timeFilter(1487076708000)).toEqual('13:51')
    })
  })
})
