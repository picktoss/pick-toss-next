import { useCallback, useRef } from 'react'
import { useForceUpdate } from './use-force-update'

interface Item {
  id: string | number
  checked?: boolean
}

export function useCheckListIgnoreIds<T extends Item>(
  initialItems: T[],
  options?: { ignoreIds: Item['id'][] }
) {
  type IdType = T['id']
  const listRef = useRef<T[]>(initialItems)
  const forceUpdate = useForceUpdate()

  const findItem = useCallback(
    (id: IdType) => listRef.current.find(({ id: _id }) => _id === id),
    []
  )

  const findIndex = useCallback(
    (id: IdType) => listRef.current.findIndex(({ id: _id }) => _id === id),
    []
  )

  const isChecked = useCallback((id: IdType) => findItem(id)?.checked, [findItem])

  const isAllChecked = useCallback(() => listRef.current.every(({ checked }) => checked), [])

  const isAllCheckedWithoutIgnored = useCallback(() => {
    if (options?.ignoreIds == null || options?.ignoreIds.length === 0) {
      return isAllChecked()
    }

    return listRef.current.every(({ id, checked }) => {
      if (options.ignoreIds.includes(id)) {
        return true
      }

      return checked
    })
  }, [options, isAllChecked])

  const set = useCallback(
    (items: T[]) => {
      listRef.current = items
      forceUpdate()
    },
    [forceUpdate]
  )

  const updateItem = useCallback(
    (id: IdType, checked: boolean) => {
      const idx = findIndex(id)
      if (idx > -1) {
        const item = listRef.current[idx]

        if (item?.checked !== checked) {
          const arr = [...listRef.current]
          arr[idx] = { ...item, id, checked } as T
          set(arr)
        }
      }
    },
    [findIndex, set]
  )

  const toggle = useCallback(
    (id: IdType) => updateItem(id, !isChecked(id)),
    [isChecked, updateItem]
  )

  const check = useCallback(
    (id: IdType) => {
      updateItem(id, true)
    },
    [updateItem]
  )

  const unCheck = useCallback(
    (id: IdType) => {
      updateItem(id, false)
    },
    [updateItem]
  )

  const toggleAll = useCallback(() => {
    const toggled = !isAllChecked()
    const arr = listRef.current.map((item) => ({ ...item, checked: toggled }))

    set(arr)
  }, [isAllChecked, set])

  const updateAll = useCallback(
    (checked: boolean) => {
      if (listRef.current.every((item) => item.checked === checked)) {
        return
      }
      set(listRef.current.map((item) => ({ ...item, checked })))
    },
    [set]
  )

  const updateAllWithoutIgnored = useCallback(
    (checked: boolean) => {
      if (
        listRef.current.every((item) => {
          if (options?.ignoreIds.includes(item.id)) return true

          return item.checked === checked
        })
      ) {
        return
      }
      set(
        listRef.current.map((item) => ({
          ...item,
          checked: options?.ignoreIds.includes(item.id) ? false : checked,
        }))
      )
    },
    [set, options]
  )

  const checkAll = useCallback(() => {
    updateAll(true)
  }, [updateAll])

  const checkAllWithoutIgnored = useCallback(() => {
    updateAllWithoutIgnored(true)
  }, [updateAllWithoutIgnored])

  const unCheckAll = useCallback(() => {
    updateAll(false)
  }, [updateAll])

  const unCheckAllWithoutIgnored = useCallback(() => {
    updateAllWithoutIgnored(false)
  }, [updateAllWithoutIgnored])

  const getCheckedList = useCallback(() => {
    return listRef.current.filter((item) => item.checked)
  }, [])

  const getCheckedIds = useCallback(() => {
    return getCheckedList().map(({ id }) => id)
  }, [getCheckedList])

  return {
    list: listRef.current,
    set,
    isChecked,
    isAllChecked,
    check,
    unCheck,
    toggle,
    updateItem,
    toggleAll,
    checkAll,
    unCheckAll,
    updateAll,
    getCheckedList,
    getCheckedIds,
    isAllCheckedWithoutIgnored,
    checkAllWithoutIgnored,
    unCheckAllWithoutIgnored,
  }
}
