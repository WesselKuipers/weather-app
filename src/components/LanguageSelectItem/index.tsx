import { Group, Image, Text } from '@mantine/core';
import { forwardRef } from 'react';

interface LanguageSelectItemProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The image displayed to the left of the select item.
   */
  image: string;

  /**
   * The user-facing label of the select item.
   */
  label: string;
}

/**
 * A custom select item used by {@link LanguageSelect}
 */
export const LanguageSelectItem = forwardRef<HTMLDivElement, LanguageSelectItemProps>(
  ({ image, label, ...others }: LanguageSelectItemProps, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={ref} {...others}>
      <Group noWrap>
        <Image radius={0} width={32} src={image} />
        <div>
          <Text title={label} size="sm">
            {label}
          </Text>
        </div>
      </Group>
    </div>
  ),
);
