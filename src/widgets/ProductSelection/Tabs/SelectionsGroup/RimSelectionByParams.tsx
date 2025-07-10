'use client'

import { useEffect } from 'react'
import { FormikSelectionInput } from '@shared/ui/SelectionInput'
import { Flex } from 'antd'
import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/app-settings'
import { quickChoiceByParamsStore } from '@/features/quickChoice/quickChoiceByParamsStore'
import { IRimSpecifications, RimSpecifications } from '@/interfaces'
import { RegularButton } from '@/shared/ui'

export const RimSelectionByParams = observer(() => {
  const router = useRouter()

  const {
    loadRimsData,
    getAllAvailableParams,
    getAvailableParams,
    diameters,
    hubHoleDiameters,
    resetInputParams,
    mountHolesAmounts,
    holeDiameters,
    offsets,
  } = quickChoiceByParamsStore

  const initialValues: IRimSpecifications = {
    [RimSpecifications.diameters]: '',
    [RimSpecifications.hubHoleDiameters]: '',
    [RimSpecifications.holeDiameters]: '',
    [RimSpecifications.mountHolesAmounts]: '',
    [RimSpecifications.offsets]: '',
  }

  useEffect(() => {
    getAllAvailableParams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: IRimSpecifications) => {
    await loadRimsData(values)
    router.push(appRoutes.rims)
  }

  const onSelect = (name: string, value: string | number) => {
    getAvailableParams({ [name]: [value as number] })
  }

  const onChange = (resetForm: VoidFunction) => (name: string, value: string) => {
    if (!value) {
      resetForm()
      resetInputParams()
      getAllAvailableParams()
    }
  }

  return (
    <Formik initialValues={initialValues} enableReinitialize onSubmit={onSubmit}>
      {({ handleChange, values, setFieldValue, dirty, resetForm }) => (
        <Form
          onChange={handleChange}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Flex gap={8}>
            <FormikSelectionInput
              // className={css.brand}
              width={200}
              options={diameters}
              name={RimSpecifications.diameters}
              placeholder='Диаметр'
              onSelectValue={onSelect}
              handleChange={onChange(resetForm)}
            />
            <FormikSelectionInput
              width={210}
              options={mountHolesAmounts}
              name={RimSpecifications.mountHolesAmounts}
              placeholder='Кол-во отверстий'
              onSelectValue={onSelect}
              handleChange={onChange(resetForm)}
            />
            <FormikSelectionInput
              width={200}
              options={holeDiameters}
              name={RimSpecifications.holeDiameters}
              placeholder='Расположение отверстий (PCD)'
              onSelectValue={onSelect}
              handleChange={onChange(resetForm)}
            />
            <FormikSelectionInput
              width={200}
              options={hubHoleDiameters}
              name={RimSpecifications.hubHoleDiameters}
              placeholder='Посадочный диаметр (DIA)'
              onSelectValue={onSelect}
              handleChange={onChange(resetForm)}
            />
            <FormikSelectionInput
              width={200}
              options={offsets}
              name={RimSpecifications.offsets}
              placeholder='Вылет (ET)'
              onSelectValue={onSelect}
              handleChange={onChange(resetForm)}
            />
            {/* <div className={css.checkboxes}>
              <div className={css.checkboxesTitle}>Количество крепежных отверстий</div>
              <div className={css.checkboxesBody}>
                {['4', '5', '6'].map((count) => (
                  // <CheckboxListItem
                  //   key={count}
                  //   label={count}
                  //   checked={mountHoleCount === count}
                  //   onCheck={handleChangeMountHoleCount(count)}
                  // />
                  <CheckboxListItem
                    key={count}
                    label={count}
                    checked={values.mountHoleCount === count}
                    onCheck={(e) => setFieldValue(RimSpecifications.mountHoleCount, e.target.checked)}
                  />
                ))}
              </div>
            </div> */}
            <RegularButton style={{ marginLeft: '16px' }} type='submit' text='Подобрать' disabled={!dirty} />
          </Flex>
        </Form>
      )}
    </Formik>
  )
})

RimSelectionByParams.displayName = 'RimSelectionByParams'
