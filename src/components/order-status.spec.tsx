import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right text based when order status is pending', () => {
    const wrapper = render(<OrderStatus status='pending' />)

    const badge = wrapper.getByTestId('badge')
    const text = wrapper.getByText('Pendente')

    expect(badge).toHaveClass('bg-slate-400')
    expect(text).toBeInTheDocument()
  })

  it('should display the right text based when order status is canceled', () => {
    const wrapper = render(<OrderStatus status='canceled' />)

    const badge = wrapper.getByTestId('badge')
    const text = wrapper.getByText('Cancelado')

    expect(badge).toHaveClass('bg-rose-500')
    expect(text).toBeInTheDocument()
  })

  it('should display the right text based when order status is processing', () => {
    const wrapper = render(<OrderStatus status='processing' />)

    const badge = wrapper.getByTestId('badge')
    const text = wrapper.getByText('Em preparo')

    expect(badge).toHaveClass('bg-amber-500')
    expect(text).toBeInTheDocument()
  })

  it('should display the right text based when order status is delivering', () => {
    const wrapper = render(<OrderStatus status='delivering' />)

    const badge = wrapper.getByTestId('badge')
    const text = wrapper.getByText('Em entrega')

    expect(badge).toHaveClass('bg-amber-500')
    expect(text).toBeInTheDocument()
  })

  it('should display the right text based when order status is delivered', () => {
    const wrapper = render(<OrderStatus status='delivered' />)

    const badge = wrapper.getByTestId('badge')
    const text = wrapper.getByText('Entregue')

    expect(badge).toHaveClass('bg-emerald-500')
    expect(text).toBeInTheDocument()
  })
})
