import { shallowMount } from '@vue/test-utils'
import Messenger from '@/views/messenger/Messenger'

describe('Messenger', () => {
  let wrapper
  let dateNowSpy
  const recipient = { id: 1, name: 'test', avatar: '' }

  beforeAll(() => {
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000)
    wrapper = shallowMount(Messenger)
    wrapper.vm.history = {}
  })
  afterAll(() => {
    dateNowSpy.mockRestore()
  })

  it("doesn't a new message to history without recipient", () => {
    const spy = jest.spyOn(wrapper.vm, 'scrollHistoryToBottom')
    wrapper.vm.addMessageToHistory('New Message')
    expect(wrapper.vm.history).toStrictEqual({})
    expect(spy).not.toBeCalled()
  })

  it("doesn't a new message to history with an empty message", () => {
    const spy = jest.spyOn(wrapper.vm, 'scrollHistoryToBottom')
    wrapper.vm.addMessageToHistory('')
    expect(wrapper.vm.history).toStrictEqual({})
    expect(spy).not.toBeCalled()
  })

  it('adds a new message to history', () => {
    const spy = jest.spyOn(wrapper.vm, 'scrollHistoryToBottom')
    wrapper.vm.currentRecipient = recipient
    wrapper.vm.addMessageToHistory('New Message')
    expect(wrapper.vm.history).toStrictEqual({
      '1': [
        {
          date: 1487076708000,
          text: 'New Message',
          senderId: 0,
        },
      ],
    })
    expect(spy).toBeCalled()
  })
  it('sets a new recipient', () => {
    const spy = jest.spyOn(wrapper.vm, 'scrollHistoryToBottom')
    wrapper.vm.onSelectRecipient(recipient)
    expect(wrapper.vm.currentRecipient).toStrictEqual(recipient)
    expect(spy).toBeCalled()
  })
})
