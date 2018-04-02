import React from 'react';
import $ from 'jquery';

class Ibox extends React.Component {
    collapsePanel(e) {
        var element = $(e.target);
        var ibox = element.closest('div.ibox');
        var button = element.closest("i");
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    }

    closePanel(e) {
        var element = $(e.target);
        var content = element.closest('div.ibox');
        content.remove();
    }

    fullScreenPanel(e) {
        var element = $(e.target);
        var ibox = element.closest('div.ibox');
        var button = element.find('i');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
            $(window).trigger('resize');
        }, 100);
    }

    render() {
        return (
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    {this.props.titleLabel && <span className="label label-primary pull-right">{this.props.titleLabel}</span>}
                    <h5>{this.props.title}</h5>
                    {this.props.tools && 
                        <div className="ibox-tools">
                            <a className="collapse-link" onClick={this.collapsePanel.bind(this)}>
                                <i className="fa fa-chevron-up"></i>
                            </a>
                            <a className="fullscreen-link" onClick={this.fullScreenPanel.bind(this)}>
                                <i className="fa fa-window-maximize" aria-hidden="true"></i>
                            </a>
                            <a className="close-link" onClick={this.closePanel.bind(this)}>
                                <i className="fa fa-times"></i>
                            </a>
                        </div>
                    }
                </div>
                <div className={"ibox-content" + (this.props.loading ? ' sk-loading' : '')}>
                    <div className="sk-spinner sk-spinner-three-bounce">
                        <div className="sk-bounce1"></div>
                        <div className="sk-bounce2"></div>
                        <div className="sk-bounce3"></div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
};

export default Ibox;
