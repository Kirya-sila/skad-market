import dImg from '../assets/d.png'
import diaImg from '../assets/dia.png'
import etImg from '../assets/et.png'
import jImg from '../assets/j.png'
import lzImg from '../assets/lz.png'
import pcdImg from '../assets/pcd.png'
import lzxpcdImg from '../assets/lzxpcd.png'
import { ActiveFilterName } from '@/entities/Rims/model/types'
import { ParamsHelpModalProps } from '@/features/filters/ui/ParamsHelpModal/ParamsHelpModal'

export const getModalPropsByFilterName = (
  filterName: ActiveFilterName | string,
): Partial<ParamsHelpModalProps> | undefined => {
  switch (filterName) {
    case 'diameter':
    case 'diameters': {
      return {
        title: 'D - диаметр диска',
        subtitle: 'Измеряется в дюймах (inch)',
        body: 'Показатель размера посадочного обода, предназначенного для покрышки.',
        image: dImg,
      }
    }
    case 'lz':
    case 'mountHolesAmounts': {
      return {
        title: 'LZ - количество крепежных отверстий',
        body: 'Количество отверстий для крепления болтами (гайками).',
        image: lzImg,
      }
    }
    case 'holeDiameters': {
      return {
        title: 'PCD - диаметр расположения отверстий',
        subtitle: 'Измеряется в миллиметрах (mm)',
        body: 'Диаметр окружности, на которой расположены центры крепежных отверстий.',
        image: pcdImg,
      }
    }
    case 'et':
    case 'offsets': {
      return {
        title: 'ET - вылет диска',
        subtitle: 'Измеряется в миллиметрах (mm)',
        body: 'Расстояние от привалочной (прилегающей к ступице) плоскости диска до середины обода.',
        image: etImg,
      }
    }
    case 'rimWidth':
    case 'widthParams': {
      return {
        title: 'J - ширина диска',
        subtitle: 'Измеряется в дюймах (inch)',
        body: 'Ширина измеряется по “полке диска”, на которую ложатся боковины шины.',
        image: jImg,
      }
    }
    case 'hubHoleDiameters': {
      return {
        title: 'DIA - диаметр центрального отверстия',
        subtitle: 'Измеряется в миллиметрах (mm)',
        body: 'Диаметр посадочного места центрального отверстия колеса.',
        image: diaImg,
      }
    }
    case 'loadIndexes': {
      return {
        title: 'Максимальная нагрузка',
        subtitle: 'Измеряется в килограммах (kg)',
        body: 'Максимально разрешенная нагрузка на колесо должна быть больше или равна половине величины максимально допустимой массы, приходящейся на заднюю (или переднюю, если она больше) ось транспортного средства. Масса указывается в руководстве по эксплуатации автомобиля, а также на табличках, расположенных на кузове автомобиля (для машин европейского рынка они располагаются в области передних дверей, либо под капотом).',
      }
    }
    case 'lzxpcd': {
      return {
        title: 'LZxPCD',
        subtitle: '',
        body: 'Крепеж – состоит из количества крепежных отверстий (LZ) и диаметра окружности центровых отверстий (PCD). Пример: "5x114,3" обозначает 5 крепёжных отверстий, которые расположены на окружности 114,3 мм.',
        image: lzxpcdImg,
      }
    }
    case 'sizeDesignation': {
      return {
        title: 'Размер',
        subtitle: 'Измеряется в дюймах (inch)',
        body: 'Обозначает ширину (J) и диаметр диска (H2). Параметр "8,5Jx20H2" означает ширину в 8,5″ и диаметр в 20″.',
      }
    }
    case 'cylinderScrew': {
      return {
        title: 'Форма крепежных отверстий',
        subtitle: '',
        body: 'Крепежные отверстия представлены 3-мя формами: конус, сфера, цилиндр. Крепежное отверстие обеспечивает надёжность крепления диска к ступице и правильную центровку.',
      }
    }
    case 'lz1_d1': {
      return {
        title: 'Диаметр отверстия под болт/шпильку',
        subtitle: 'Измеряется в миллиметрах (mm)',
        body: 'Диаметр отверстия под крепежный элемент: болт/шпильку.',
      }
    }
    case 'lz1_d2': {
      return {
        title: 'Диаметр отверстия под балонник',
        subtitle: 'Измеряется в миллиметрах (mm)',
        body: 'Диаметр отверстия под балонный ключ.',
      }
    }
  }
}
