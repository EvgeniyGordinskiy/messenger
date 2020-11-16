import InputMsg from '@/views/messenger/components/inputMsg/InputMsg'
import { shallowMount } from '@vue/test-utils'

describe('Input Message', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowMount(InputMsg)
  })

  it('doesnt emit a new message', () => {
    wrapper.vm.messageText = ''
    wrapper.vm.addMessageToHistory({ preventDefault: () => {} })
    expect(wrapper.emitted('add-message')).not.toEqual([['New Message']])
  })

  it('emits a new message and clear the state', () => {
    const spy = jest.spyOn(wrapper.vm, 'clearInput')
    wrapper.vm.messageText = 'New Message'
    wrapper.vm.addMessageToHistory({ preventDefault: () => {} })
    expect(wrapper.emitted('add-message')).toEqual([['New Message']])
    expect(spy).toBeCalled()
  })

  it('clears the state', () => {
    wrapper.vm.messageText = 'New message'
    wrapper.vm.clearInput()
    expect(wrapper.vm.$refs.textInput.innerText).toEqual('')
    expect(wrapper.vm.messageText).toEqual('')
    expect(wrapper.vm.isEmojiEnabled).toEqual(false)
  })
})
