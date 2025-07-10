'use client'

import { FormikSelectionInput } from '@shared/ui/SelectionInput'
import { Flex } from 'antd'
import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/app-settings'
import searchCarStore from '@/features/SearchCar/model/searchCarStore'
import { quickChoiceByCarStore } from '@/features/quickChoice'
import { RegularButton } from '@/shared/ui'

enum CarSpecifications {
  brand = 'brand',
  model = 'model',
  generation = 'generation',
}

interface RimSelectionByCarProps {
  className?: string
}

interface ICarSpecification {
  [CarSpecifications.brand]: string
  [CarSpecifications.model]: string
  [CarSpecifications.generation]: number | null
}

export const RimSelectionByCar = observer(({ className }: RimSelectionByCarProps) => {
  const router = useRouter()
  const { carBrandsList, brandModelsList, generationsList, getModelsByBrand, getGenerations } = quickChoiceByCarStore
  const { loadSpecifiedCarByCarId } = searchCarStore
  // const [carSpecification, setCarSpecification] = useState<ICarSpecification>({ brand: '', model: '', generation: '' })

  const initialValues: ICarSpecification = {
    [CarSpecifications.brand]: '',
    [CarSpecifications.model]: '',
    [CarSpecifications.generation]: null,
  }

  const onSubmit = (values: ICarSpecification) => {
    loadSpecifiedCarByCarId(values[CarSpecifications.generation] ?? 0)
    router.push(appRoutes.rims)
  }

  const onChange =
    (setFieldValue: (field: string, value: string) => void) => (name: string, value: string | number) => {
      if (name === CarSpecifications.brand) {
        setFieldValue(CarSpecifications.model, '')
        setFieldValue(CarSpecifications.generation, '')
        getModelsByBrand(value.toString())
      }
      if (name === CarSpecifications.model) {
        setFieldValue(CarSpecifications.generation, '')
        getGenerations(value.toString())
      }
      if (name === CarSpecifications.generation) {
        loadSpecifiedCarByCarId(Number(value))
      }
    }

  return (
    <Formik initialValues={initialValues} enableReinitialize onSubmit={onSubmit}>
      {({ handleChange, values, setFieldValue, dirty }) => (
        <Form
          onChange={handleChange}
          id='buyer-submit'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Flex gap={8}>
            <FormikSelectionInput
              // className={css.brand}
              width={200}
              options={carBrandsList}
              name={CarSpecifications.brand}
              placeholder='Марка'
              onSelectValue={onChange(setFieldValue)}
              onFocus={() => console.log('Focus')}
            />
            <FormikSelectionInput
              // className={css.model}
              width={200}
              options={brandModelsList}
              name={CarSpecifications.model}
              placeholder='Модель'
              disabled={!values.brand}
              onSelectValue={onChange(setFieldValue)}
            />
            <FormikSelectionInput
              // className={css.generation}
              width={200}
              options={generationsList}
              name={CarSpecifications.generation}
              placeholder='Поколение'
              disabled={!values.model}
              // onSelectValue={onChange(setFieldValue)}
            />
            {/* <SelectionInput className={css.modification} items={MODIFICATIONS_ITEMS} placeholder='Модификация' /> */}
            <RegularButton
              style={{ marginLeft: '16px' }}
              type='submit'
              text='Подобрать'
              disabled={!values.generation || !dirty}
            />
          </Flex>
        </Form>
      )}
    </Formik>
  )
})

RimSelectionByCar.displayName = 'RimSelectionByCar'
