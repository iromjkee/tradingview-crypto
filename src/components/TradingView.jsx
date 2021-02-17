import * as React from "react";
import { widget } from "../charting_library";
import Datafeed from "./index";

export class TradingView extends React.PureComponent {
  static defaultProps = {
    symbol: "Coinbase:BTC/USD",
    interval: "15",
    containerId: "tv_chart_container",
    datafeedUrl: "https://demo_feed.tradingview.com",
    libraryPath: "/charting_library/",
  };

  tvWidget = null;

  componentDidMount() {
    const widgetOptions = {
      symbol: this.props.symbol,
      datafeed: Datafeed,
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,
      locale: "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      studies_overrides: this.props.studiesOverrides,
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return <div id={this.props.containerId} className="TradingView" />;
  }
}
