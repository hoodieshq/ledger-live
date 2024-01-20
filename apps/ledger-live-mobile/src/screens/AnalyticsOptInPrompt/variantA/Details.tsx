import React, { memo } from "react";
import styled from "styled-components/native";
import { Flex, Link, Text } from "@ledgerhq/native-ui";
import { TrackScreen } from "~/analytics";
import { useTranslation } from "react-i18next";
import Button from "~/components/Button";
import Switch from "~/components/Switch";
import { View, Container, Titles, Content, Bottom } from "../Common";

const OptionContainer = styled(Flex).attrs({
  width: "100%",
  alignItems: "flex-start",
})``;

const OptionRow = styled(Flex).attrs({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "opacityDefault.c05",
  borderRadius: 12,
  width: "100%",
  padding: 4,
})``;

interface OptionProps {
  title: string;
  description: string;
  checked: boolean;
  onToggle?: (_: boolean) => void;
}

function Option({ title, description, checked, onToggle }: OptionProps): React.ReactElement {
  return (
    <OptionContainer>
      <OptionRow>
        <Text variant="large" fontWeight="medium" color="neutral.c100">
          {title}
        </Text>
        <Switch value={checked} onChange={onToggle} />
      </OptionRow>
      <Text fontSize={14} pt={4} pb={2} color="neutral.c70">
        {description}
      </Text>
    </OptionContainer>
  );
}

function Details() {
  const { t } = useTranslation();

  const bothSelected = false;

  return (
    <Container alignItems="center">
      <View>
        <Titles>
          <Text variant="h3Inter" fontSize={24} fontWeight="semiBold" color="neutral.c100">
            {t("analyticsOptIn.variantA.details.title")}
          </Text>
        </Titles>
        <Content>
          <Option
            title={t("analyticsOptIn.variantA.details.analytics.title")}
            description={t("analyticsOptIn.variantA.details.analytics.description")}
            checked={false}
            onToggle={() => { }}
          />
          <Flex pt={7}>
            <Option
              title={t("analyticsOptIn.variantA.details.personalizedExp.title")}
              description={t("analyticsOptIn.variantA.details.personalizedExp.description")}
              checked={true}
              onToggle={() => { }}
            />
          </Flex>
        </Content>
      </View>
      <Bottom>
        <Flex flexDirection="row" py="20px">
          <Button
            title={t("analyticsOptIn.variantA.details.ctas.notNow")}
            onPress={() => { }}
            type="shade"
            size="large"
            mr="2"
            flex={1}
          />
          <Button
            title={t(
              bothSelected
                ? "analyticsOptIn.variantA.details.ctas.acceptAll"
                : "analyticsOptIn.variantA.details.ctas.accept",
            )}
            onPress={() => { }}
            type="main"
            size="large"
            outline={false}
            ml="2"
            flex={1}
          />
        </Flex>
        <Text fontWeight="semiBold" pt={2} color="neutral.c70" textAlign="center" pb="2">
          {t("analyticsOptIn.variantA.details.infoText.info")}
        </Text>
        <Link size="small" type="color" onPress={() => { }}>
          {t("analyticsOptIn.variantA.details.infoText.link")}
        </Link>
      </Bottom>
      <TrackScreen category="Analytics Opt In Prompt" name="Details" />
    </Container>
  );
}

export default memo(Details);
